import { Button } from "@/components/ui/button";

export default function ButtonsPage() {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button>Default</Button>
      <Button variant="primary">Primary outline</Button>
      <Button variant="primaryOutline">Third One</Button>

      <Button variant="secondary">Secondary</Button>
      <Button variant="secondaryOutline">Secondary outline</Button>

      <Button variant="danger">Danger</Button>
      <Button variant="dangerOutline">Danger outline</Button>

      <Button variant="super">Super</Button>
      <Button variant="superOutline">Super outline</Button>

      <Button variant="ghost">Ghost</Button>

      <Button variant="sidebar">Sidebar</Button>
      <Button variant="sidebarOutline">Sidebar outline</Button>
    </div>
  );
}
