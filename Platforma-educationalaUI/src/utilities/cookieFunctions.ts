import { useNavigate } from "react-router-dom";

export function useGetCookie(name: string) {
  const navigator = useNavigate();
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  else navigator("/Login");
}
