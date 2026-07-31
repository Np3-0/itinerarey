import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import earth from "../../assets/earth/earth.jpg";
import heightmap from "../../assets/earth/heightmap.png";
import herocities from "../../data/herocities.ts";
import XSVG from '../../assets/icons/XSVG.tsx';

export default function Hero() {
    const globeEl = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredPoint, setHoveredPoint] = useState<any>(null);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);
    const [globeSize, setGlobeSize] = useState({
        width: window.innerWidth,
        height: 600
    });
    const [inputValue, setInputValue] = useState("");

    const handlePointClick = (point: any) => {
        if (!globeEl.current) return;

        const controls = globeEl.current.controls();

        if (selectedPoint) {
            setSelectedPoint(null);
            controls.autoRotate = true;
            controls.autoRotateSpeed = -3;
        } else {
            setSelectedPoint(point);
            controls.autoRotate = true;
            controls.autoRotateSpeed = -1;
        }

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

    // window resize
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            setGlobeSize({
                width: entry.contentRect.width,
                height:
                    entry.contentRect.width < 640 ? 350 :
                        entry.contentRect.width < 768 ? 450 :
                            entry.contentRect.width < 1024 ? 550 :
                                600
            });
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-cerulean text-floral-white pb-12">
            <div className="relative max-w-7xl mx-auto py-16 sm:py-24" ref={containerRef}>
                <Globe
                    ref={globeEl}
                    backgroundColor="#227c9d"
                    height={globeSize.height}
                    width={globeSize.width}
                    globeImageUrl={earth}
                    bumpImageUrl={heightmap}
                    pointsData={herocities}
                    pointLat="lat"
                    pointLng="lng"
                    pointColor={() => "#fe6d73"}
                    pointRadius={(d: any) => (d === hoveredPoint ? 2 : 1)}
                    pointAltitude={0.01}
                    onPointHover={(point) => {
                        setHoveredPoint((prev: any) => prev === point ? prev : point);
                    }}
                    onPointClick={(point) => handlePointClick(point)}
                />
                {/* Point Detail Card */}
                {selectedPoint && (
                    <div className="fixed inset-0 flex items-center justify-end bg-opacity-50 z-100 mx-6 pb-48">
                        <div className="relative bg-accent-blue p-8 rounded-lg shadow-lg max-w-md w-full">
                            <XSVG
                                classes="absolute top-4 right-4 text-red-500 hover:scale-110 transition duration-300 cursor-pointer"
                                onClick={() => handlePointClick(selectedPoint)}
                            />

                            <h2 className="text-2xl font-bold mb-4">{selectedPoint?.name || "Point Details"}</h2>
                            <p>{selectedPoint?.description}</p>
                            <img
                                src={selectedPoint?.img}
                                alt={selectedPoint?.name}
                                className="mt-4 rounded-lg shadow-md"
                            />
                            <button
                                className="mt-4 bg-floral-white text-cerulean hover:bg-ocean-mist hover:text-floral-white hover:scale-110 py-2 px-4 rounded-lg transition duration-300 font-semibold text-lg cursor-pointer"
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedPoint?.lat},${selectedPoint?.lng}`, '_blank')}
                            >
                                Check it out!
                            </button>
                        </div>
                    </div>
                )}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}>
                    <form 
                        className="flex bg-floral-white rounded-full shadow-lg px-6 py-4"
                        id="search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log("Search submitted:", inputValue);
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inputValue)}`, '_blank')}
                        }
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent outline-none text-cerulean placeholder:text-cerulean text-xl"
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button 
                            className="bg-cerulean text-floral-white hover:bg-ocean-mist hover:scale-110 py-3 px-12 rounded-full transition duration-300 font-semibold text-lg cursor-pointer" 
                            type="submit"
                        >
                            Go!
                        </button>
                    </form>
                </div>
            </div>

        </section>
    );
}