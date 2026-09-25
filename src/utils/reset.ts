import { deleteCookie } from "./cookies.ts";

export default function reset() {
    const decision = confirm("Are you sure about this? This will delete your trip's data!")
    if (!decision) return;
    
    deleteCookie("tripInfo");
    window.location.href = "/";
}