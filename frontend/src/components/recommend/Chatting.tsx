export default function Chatting({ content }: { content: string }) {
  return (
    <div className="relative max-w-[612px] w-fit px-7 py-4 border border-dashed border-beige-dark rounded-md text-[rgba(188,_180,_172)]">
      {content}
    </div>
  );
}
