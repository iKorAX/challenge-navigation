export function handleOnClick(e: React.MouseEvent<HTMLElement>) {
  const target = e.currentTarget;
  target.parentElement?.querySelector(".nested")?.classList.toggle("active");
  target.classList.toggle("caret-down");
}