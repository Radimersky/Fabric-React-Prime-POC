import { useState } from 'react';
import FileReaderComponent from './FileReaderComponent';
import { XMLParser } from 'fast-xml-parser';
import { Scene } from './types/PrimeSceneStructure';
import './css/CanvasToolbar.css';

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '',
};

const PrimeSceneParser: React.FC<PrimeSceneParserProps> = ({
  onSceneParsed,
}) => {
  const [xmlParser] = useState<XMLParser>(new XMLParser(parserOptions));

  const handleFileContent = (fileContent: string | ArrayBuffer) => {
    if (fileContent instanceof ArrayBuffer) {
      parseXml(Buffer.from(fileContent));
    } else {
      parseXml(fileContent);
    }
  };

  const parseXml = (xmlContent: string | Buffer) => {
    // TODO Implement type guards
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsXmlContent = xmlParser.parse(xmlContent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    onSceneParsed(jsXmlContent.Scene);
  };

  return (
    <div className="tool-container">
      <span>Select Prime Scene:</span>
      <FileReaderComponent onFileRead={handleFileContent} />
    </div>
  );
};

type PrimeSceneParserProps = {
  onSceneParsed: (scene: Scene) => void;
};

export default PrimeSceneParser;
