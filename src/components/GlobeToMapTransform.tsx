"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// @ts-ignore
import { feature } from "topojson-client";

export function GlobeToMapTransform() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [worldData, setWorldData] =
    useState<d3.ExtendedFeatureCollection | null>(null);
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState<[number, number]>([0, 0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef<number | null>(null);

  const width = 800;
  const height = 500;

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        );
        const world = await response.json();
        const countries = feature(
          world,
          world.objects.countries,
        ) as unknown as d3.ExtendedFeatureCollection;
        setWorldData(countries);
      } catch (error) {
        console.error("Error loading world data:", error);
      }
    };

    loadWorldData();
  }, []);

  useEffect(() => {
    if (autoRotate && !isDragging) {
      const rotate = () => {
        setRotation((prev) => [prev[0] + 0.3, prev[1]]);
        autoRotateRef.current = requestAnimationFrame(rotate);
      };
      autoRotateRef.current = requestAnimationFrame(rotate);
    } else {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
        autoRotateRef.current = null;
      }
    }

    return () => {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [autoRotate, isDragging]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setLastMouse([event.clientX - rect.left, event.clientY - rect.top]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentMouse: [number, number] = [
      event.clientX - rect.left,
      event.clientY - rect.top,
    ];
    const dx = currentMouse[0] - lastMouse[0];
    const dy = currentMouse[1] - lastMouse[1];

    setRotation((prev) => [
      prev[0] + dx * 0.5,
      Math.max(-90, Math.min(90, prev[1] - dy * 0.5)),
    ]);

    setLastMouse(currentMouse);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setAutoRotate(true);
  };

  useEffect(() => {
    if (!svgRef.current || !worldData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoOrthographic()
      .scale(200)
      .translate([width / 2, height / 2])
      .rotate([rotation[0], rotation[1]])
      .precision(0.1);

    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();
    svg
      .append("path")
      .datum(graticule())
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.2);

    svg
      .selectAll(".country")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.0)
      .attr("opacity", 1.0);

    svg
      .append("path")
      .datum({ type: "Sphere" } as d3.GeoPermissibleObjects)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.5);
  }, [worldData, rotation]);

  const handleReset = () => {
    setRotation([0, 0]);
    setAutoRotate(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-4xl h-auto border rounded-lg bg-transparent border-border cursor-grab active:cursor-grabbing text-foreground"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
