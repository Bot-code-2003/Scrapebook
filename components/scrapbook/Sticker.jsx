'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown, Trash2, RotateCw } from 'lucide-react';

export default function Sticker({ 
    data, 
    isSelected, 
    onSelect, 
    onUpdate, 
    onRemove, 
    onLayerChange,
    readOnly,
    containerRef
}) {
    const { id, url, x, y, rotation, scale, zIndex } = data;
    const elementRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

    // Initial drag position reference
    const dragStartRef = useRef({ x: 0, y: 0 });
    const initialPosRef = useRef({ x, y });
    const initialRotationRef = useRef(rotation);

    // Handle Drag Start
    const handleMouseDown = (e) => {
        if (readOnly) return;
        if (e.target.closest('.controls')) return; // Don't drag if clicking controls

        e.preventDefault();
        e.stopPropagation();
        onSelect(id);
        setIsDragging(true);
        
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        initialPosRef.current = { x, y };
    };

    const handleTouchStart = (e) => {
        if (readOnly) return;
        if (e.target.closest('.controls')) return;

        e.stopPropagation();
        onSelect(id);
        setIsDragging(true);
        const touch = e.touches[0];
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
        initialPosRef.current = { x, y };
    };

    // Handle Rotate Start
    const handleRotateStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRotating(true);
    };

    const handleRotateTouchStart = (e) => {
        e.stopPropagation();
        setIsRotating(true);
    };

    // Global Move/Up handlers
    useEffect(() => {
        const handleMove = (e) => {
            if (!isDragging && !isRotating) return;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            if (isDragging) {
                if (!containerRef.current) return;
                const containerRect = containerRef.current.getBoundingClientRect();
                
                // Calculate delta in pixels
                const deltaX = clientX - dragStartRef.current.x;
                const deltaY = clientY - dragStartRef.current.y;
                
                // Convert pixel delta to percentage of container
                const deltaXPercent = (deltaX / containerRect.width) * 100;
                const deltaYPercent = (deltaY / containerRect.height) * 100;

                onUpdate(id, {
                    x: initialPosRef.current.x + deltaXPercent,
                    y: initialPosRef.current.y + deltaYPercent
                });
            }

            if (isRotating) {
                if (!elementRef.current) return;
                const rect = elementRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const radians = Math.atan2(clientY - centerY, clientX - centerX);
                const degrees = radians * (180 / Math.PI);
                
                // Add 90 degrees because the handle is at the bottom (90deg position relative to standard 0 at 3 o'clock)
                // Adjust based on handle position preference
                let newRotation = degrees - 90; 
                
                onUpdate(id, { rotation: newRotation });
            }
        };

        const handleUp = () => {
            setIsDragging(false);
            setIsRotating(false);
        };

        if (isDragging || isRotating) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging, isRotating, id, onUpdate, containerRef]);

    const showControls = (isSelected || isHovered) && !readOnly;

    return (
        <div
            ref={elementRef}
            className={`absolute select-none ${isSelected ? 'z-[100]' : ''}`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: 'max-content',
                transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                zIndex: isDragging ? 100 : zIndex,
                touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Controls */}
            {showControls && (
                <div className="controls absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white shadow-xl rounded-full p-1.5 border border-gray-200 z-[101] animate-in fade-in zoom-in duration-200">
                    <button 
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onLayerChange(id, 'forward'); }} 
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" 
                        title="Bring Forward"
                    >
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                         onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onLayerChange(id, 'backward'); }} 
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors" 
                        title="Send Backward"
                    >
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>
                    <button 
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => { e.stopPropagation(); onRemove(id); }} 
                        className="p-1.5 hover:bg-red-50 rounded-full text-red-500 transition-colors" 
                        title="Remove"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Selection Border */}
            {showControls && (
                <div className="absolute inset-0 -m-2 border-2 border-dashed border-rose-400 rounded-lg pointer-events-none"></div>
            )}

            {/* Image */}
            <img 
                src={url} 
                alt="sticker" 
                className="w-24 md:w-32 h-auto pointer-events-none drop-shadow-md" 
                draggable={false}
            />

            {/* Rotate Handle */}
            {showControls && (
                <div 
                    className="controls absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-move z-[101] hover:scale-110 transition-transform active:scale-95"
                    onMouseDown={handleRotateStart}
                    onTouchStart={handleRotateTouchStart}
                >
                    <RotateCw className="w-4 h-4 text-rose-500" />
                </div>
            )}
        </div>
    );
}
