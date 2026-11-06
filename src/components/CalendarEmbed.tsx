

export default function CalendarEmbed() {
  return (
    <div className="w-full flex justify-center overflow-hidden rounded-xl bg-white shadow-xl border border-vinho/10">
      <iframe 
        src="https://calendar.google.com/calendar/embed?src=f5534c610f767d5f956240c38babfe2906187568f61676b90eb921b9d6b5f5e6%40group.calendar.google.com&ctz=America%2FSao_Paulo" 
        style={{ border: 0 }} 
        width="100%" 
        height="600" 
        frameBorder="0" 
        scrolling="no"
        title="Agenda CUCA"
      />
    </div>
  );
}
