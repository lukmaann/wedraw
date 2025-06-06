import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
}

const Rectangle = ({ id, layer, selectionColor, onPointerDown }: RectangleProps) => {
    const { x, y, fill, width, height } = layer;

    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                transform: `translate(${x}px, ${y}px)`,
          
            }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={selectionColor || "#000"}
            stroke="transparent"
        />
    );
};

export default Rectangle;
