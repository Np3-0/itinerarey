import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import earth from "../assets/earth/earth.jpg";
import heightmap from "../assets/earth/heightmap.png";
import herocities from "../data/herocities.ts";
import XSVG from '../assets/icons/XSVG.tsx';

export default function Hero() {
    const globeEl = useRef<any>(null);
    const [hoveredPoint, setHoveredPoint] = useState<any>(null);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);
    const [pointClicked, setPointClicked] = useState<boolean>(false);

    const handlePointClick = (point: any, pointClicked: boolean) => {
        if (!globeEl.current || !point) return;

        setSelectedPoint(point);

        const controls = globeEl.current.controls();

        if (pointClicked) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = -3;
        } else {
            controls.autoRotate = true;
            controls.autoRotateSpeed = -1;
        }

        setPointClicked(!pointClicked);
        controls.update();
    };

    // basic controls
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

    // pauses when point is hovered
    useEffect(() => {
        if (!globeEl.current) return;

        const controls = globeEl.current.controls();
        controls.autoRotate = hoveredPoint === null;
        controls.update();
    }, [hoveredPoint]);

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
                    onPointClick={(point) => handlePointClick(point, pointClicked)}
                />
                {/* Point Detail Card */}
                {pointClicked && (
                    <div className="fixed inset-0 flex items-center justify-end bg-opacity-50 z-50 mx-6 pb-48">
                        <div className="relative bg-accent-blue p-8 rounded-lg shadow-lg max-w-md w-full">
                            <XSVG
                                classes="absolute top-4 right-4 text-red-500 hover:scale-110 transition duration-300 cursor-pointer"
                                onClick={() => handlePointClick(selectedPoint, pointClicked)}
                            />

                            <h2 className="text-2xl font-bold mb-4">{selectedPoint?.name || "Point Details"}</h2>
                            <p>{selectedPoint?.description}</p>
                            <img
                                src={selectedPoint?.img}
                                alt={selectedPoint?.name}
                                className="mt-4 rounded-lg shadow-md"
                            />
                            <button 
                                className="mt-4 bg-floral-white text-cerulean hover:bg-ocean-mist hover:scale-110 py-2 px-4 rounded-lg transition duration-300 font-semibold text-lg cursor-pointer"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedPoint?.lat},${selectedPoint?.lng}`, '_blank')}
                            >
                                Check it out!
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </section>
    );
}