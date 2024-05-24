export default function getCookie(name: string): null | string {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring((name + '=').length);
    }
  }
  return null;
}
