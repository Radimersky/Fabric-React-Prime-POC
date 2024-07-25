import { Canvas, Textbox } from 'fabric';
import { Text } from './types/Scene';
import { useRef, useEffect, useState } from 'react';

const CanvasTextBox: React.FC<CanvasTextBoxProps> = ({
  canvas,
  options,
  scalingFactor,
}) => {
  const textboxRef = useRef<Textbox | null>(null);
  const [text, setText] = useState<string>(options.Text);

  useEffect(() => {
    const fontOptions = options.Font;
    const textbox = new Textbox(options.Text, {
      left: options.Position.X * scalingFactor,
      top: options.Position.Y * scalingFactor,
      textAlign: options.HorizontalAlignment.toLowerCase(),
      angle: options.Rotation.Z,
      width: options.Size.Width,
      height: options.Size.Height,
      selectable: false,
      opacity: options.Opacity / 100,
      fontFamily: fontOptions.Name || 'Arial',
      fontSize: fontOptions.Size * scalingFactor,
      fontWeight: fontOptions.Weight,
      fontStyle: fontOptions.Style,
      fill: '#' + fontOptions.Color,
    });

    canvas.add(textbox);
    textboxRef.current = textbox;

    return () => {
      if (textboxRef.current) {
        canvas.remove(textboxRef.current);
      }
    };
  }, [canvas, options, scalingFactor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    textboxRef.current?.set('text', newText);
    canvas.renderAll();
  };

  return (
    <div className="list-item">
      <span>{options.Name}: </span>
      <input type="text" value={text} onChange={handleInputChange} />
    </div>
  );
};

type CanvasTextBoxProps = {
  canvas: Canvas;
  options: Text;
  scalingFactor: number;
};

export default CanvasTextBox;
