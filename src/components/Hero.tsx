import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import earth from "../assets/earth/earth.jpg";
import heightmap from "../assets/earth/heightmap.png";
import herocities from "../data/herocities.ts";

export default function Hero() {
    const globeEl = useRef<any>(null);
    const [hoveredPoint, setHoveredPoint] = useState<any>(null);

    useEffect(() => {
        if (globeEl.current) {
            const controls = globeEl.current.controls();
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = -3;

            globeEl.current.pointOfView({
                lat: 40,
                lng: -100,
                altitude: 1.5
            });
        }
    }, []);

    return (
        <section className="bg-cerulean text-floral-white mt-18">
            <div className="max-w-7xl py-16 sm:py-24">
                <Globe
                    ref={globeEl}
                    backgroundColor="#227c9d"
                    height={600}
                    globeImageUrl={earth}
                    bumpImageUrl={heightmap}
                    pointsData={herocities}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor={() => "#fe6d73"}
                    pointRadius={(d: any) => (d === hoveredPoint ? 2 : 1)}
                    pointAltitude={0.01}
                    onPointHover={setHoveredPoint}
                />
            </div>
        </section>
    );
}