/* Names and roles for the menu's search (no bios), built once at deploy. */
import { TEAM_MEMBERS } from "@/lib/team-data";

export const dynamic = "force-static";
export function GET() {
  return Response.json(TEAM_MEMBERS.map((p) => ({ label: p.name, kind: p.title || p.role, href: "/about/our-people" })));
}
