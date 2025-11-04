import type { SVGProps } from "react";

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.6-.28-1.15-.64-1.62-1.12c-.32-.33-.61-.7-.82-1.12c-.19-.37-.31-.78-.38-1.21c-.07-.41-.04-.84-.04-1.28c-.01-.53-.01-1.07-.01-1.6c-1.68 0-3.36.01-5.04 0c.01 1.66.01 3.32.01 4.98c0 1.39-.49 2.78-1.58 3.81C7.04 22.62 5.15 23.3 3 23.41v-4.02c.99-.07 1.95-.34 2.8-.84c.8-.46 1.44-1.14 1.87-1.96c.21-.41.34-.87.4-1.35c.05-.37.05-.76.05-1.15c.01-1.65.01-3.3.01-4.96c1.68 0 3.35-.01 5.03 0Z"></path>
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="1em" 
            height="1em" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            {...props}
        >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12Z"></path>
        </svg>
    );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="1em" 
            height="1em" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            {...props}
        >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
        </svg>
    );
}
