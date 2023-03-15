import { TreeNode } from "../components/Navigation/Navigation.types";

export function handleOnClick(e: React.MouseEvent<HTMLElement>) {
  const target = e.currentTarget;
  target.parentElement?.querySelector(".nested")?.classList.toggle("active");
  target.classList.toggle("caret-down");
}

// recursions are still limited by the maximum stack size of whatever runs this code
// so, technically, the requirement to support "any number" of nested folders is not really fulfilled
// but the real limit will likely be in the thousands - which is beyond practical use
export function fillTree(path: string[], treeNode: TreeNode) {
  let nextNode: TreeNode;

  const node = path.shift();
  
  if (!node) return;

  const nextKey = `${treeNode.key}/${node}`;

  if (!treeNode.next.has(node)) {
    treeNode.entries.push(node);
    treeNode.next.set(node, new TreeNode(nextKey));
  }
  
  nextNode = treeNode.next.get(node)!;
  fillTree(path, nextNode);
  
  /** of course, if we're talking about large quantities of elements, 
   * it would probably be wise to check which sorting algorithm this uses,
   * and see if something different can be implemented.
  */
  treeNode.entries.sort();
}