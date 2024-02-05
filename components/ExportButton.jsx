import { useSelector } from 'react-redux';
import exportFromJSON from 'export-from-json';

const ExportButton = () => {
  const calendarData = useSelector((state) => state.data.items);

  const handleExportClick = (data) => {
    const fileName = 'download';
    const exportType = exportFromJSON.types.json;
    exportFromJSON({ data, fileName, exportType })
  };

  return (
    <>
      {!!calendarData.length && (
        <button onClick={() => handleExportClick(calendarData)} className="tools-panel__action" type="button">
          Export
        </button>)
      }
    </>
  );
};

export default ExportButton;