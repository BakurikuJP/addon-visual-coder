declare module 'blockly' {
  namespace Blockly {
    interface Workspace {
      clear(): void;
    }
    
    interface WorkspaceSvg extends Workspace {
      dispose(): void;
      addChangeListener(callback: (event: any) => void): void;
    }
  }

  namespace Xml {
    function workspaceToDom(workspace: Blockly.Workspace): Element;
    function domToText(dom: Element): string;
    function textToDom(text: string): Element;
    function domToWorkspace(dom: Element, workspace: Blockly.Workspace): void;
  }

  const Events: {
    BLOCK_DELETE: string;
  };

  function inject(container: HTMLElement, options: any): Blockly.WorkspaceSvg;
} 