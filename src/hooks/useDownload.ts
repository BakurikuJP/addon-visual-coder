import { useState } from 'react';
import JSZip from 'jszip';
import { manifestTemplate } from '../utils/manifest';
import { v4 as uuidv4 } from 'uuid';

export function useDownload() {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState('behavior_pack');
  const [fileName, setFileName] = useState('main');

  const handleDownload = (code: string) => {
    const zip = new JSZip();
    const folder = zip.folder(folderName);
    
    if (folder) {
      // マニフェストファイルの準備
      const manifest = { ...manifestTemplate };
      manifest.header.uuid = uuidv4();
      manifest.modules[0].uuid = uuidv4();
      manifest.header.name = folderName;
      manifest.modules[0].entry = `scripts/${fileName}.js`;

      // ファイル構造の作成
      folder.file('manifest.json', JSON.stringify(manifest, null, 2));
      // folder.file('pack_icon.png', ''); // TODO: アイコンファイルを追加
      
      // scriptsフォルダにコードファイルを配置
      const scriptsFolder = folder.folder('scripts');
      if (scriptsFolder) {
        scriptsFolder.file(`${fileName}.js`, code);
      }

      zip.generateAsync({ type: 'blob' })
        .then(content => {
          const url = window.URL.createObjectURL(content);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${folderName}.zip`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          setDownloadDialogOpen(false);
        });
    }
  };

  return {
    downloadDialogOpen,
    setDownloadDialogOpen,
    folderName,
    setFolderName,
    fileName,
    setFileName,
    handleDownload,
  };
} 