import { handleOnClick } from "../../helpers/utils";
import { FileTreeNodeProps } from "./FileTreeNode.types";


const FileTreeNode = ({ treeNode }: FileTreeNodeProps) => {
  return (
  <ul className='nested'>
    {treeNode.entries.map((nodeName) => {
      const next = treeNode.next.get(nodeName);
      return next ?  <li key={next.key}><span className='caret' onClick={handleOnClick}>{nodeName}</span><FileTreeNode treeNode={next} /> </li>
      : <li>{treeNode.key}</li>;
    })}
  </ul>
  )
};

export default FileTreeNode;