import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = {
  Search: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M8.5 2C12.0899 2 15 4.91015 15 8.5C15 10.1149 14.4094 11.5908 13.4346 12.7275L17.8535 17.1465L17.918 17.2246C18.0461 17.4187 18.0244 17.6827 17.8535 17.8535C17.6827 18.0244 17.4187 18.0461 17.2246 17.918L17.1465 17.8535L12.7275 13.4346C11.5908 14.4094 10.1149 15 8.5 15C4.91015 15 2 12.0899 2 8.5C2 4.91015 4.91015 2 8.5 2ZM8.5 3C5.46243 3 3 5.46243 3 8.5C3 11.5376 5.46243 14 8.5 14C11.5376 14 14 11.5376 14 8.5C14 5.46243 11.5376 3 8.5 3Z"
        fill="currentColor"
      />
    </svg>
  ),
  ArrowRight: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M11.1465 4.64648C11.3417 4.45127 11.6582 4.45136 11.8535 4.64648L16.8535 9.64649L16.916 9.72267C16.9703 9.80418 17 9.90061 17 10C17 10.1326 16.9473 10.2598 16.8535 10.3535L11.8535 15.3535C11.6583 15.5486 11.3417 15.5487 11.1465 14.3535C10.9513 15.1583 10.9514 14.8418 11.1465 14.6465L15.293 10.5H3.5C3.2239 10.5 3.00006 10.2761 3 10C3 9.72387 3.22386 9.50001 3.5 9.50001H15.293L11.1465 5.35352C10.9514 5.15826 10.9513 4.8417 11.1465 4.64648Z"
        fill="currentColor"
      />
    </svg>
  ),
  Youtube: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M4.5 5C3.11929 5 2 6.11929 2 7.5V12.5C2 13.8807 3.11929 15 4.5 15H15.5C16.8807 15 18 13.8807 18 12.5V7.5C18 6.11929 16.8807 5 15.5 5H4.5ZM4.5 6H15.5C16.3284 6 17 6.67157 17 7.5V12.5C17 13.3284 16.3284 14 15.5 14H4.5C3.67157 14 3 13.3284 3 12.5V7.5C3 6.67157 3.67157 6 4.5 6Z"
        fill="currentColor"
      />
      <path
        d="M8.5 7.5L8.5 12.5L12.5 10L8.5 7.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  Image: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
         d="M4.5 3C3.11929 3 2 4.11929 2 5.5V14.5C2 15.8807 3.11929 17 4.5 17H15.5C16.8807 17 18 15.8807 18 14.5V5.5C18 4.11929 16.8807 3 15.5 3H4.5ZM4.5 4H15.5C16.3284 4 17 4.67157 17 5.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V5.5C3 4.67157 3.67157 4 4.5 4Z"
         fill="currentColor"
      />
      <path
         d="M13.5 8C13.5 8.82843 12.8284 9.5 12 9.5C11.1716 9.5 10.5 8.82843 10.5 8C10.5 7.17157 11.1716 6.5 12 6.5C12.8284 6.5 13.5 7.17157 13.5 8Z"
         fill="currentColor"
      />
      <path
         d="M5 13L8 9L11 13H5Z"
         fill="currentColor"
      />
      <path
         d="M10 13L13 10L16 13H10Z"
         fill="currentColor"
      />
    </svg>
  ),
  MessageCircle: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
       <path
         d="M10 2C5.58172 2 2 5.13401 2 9C2 11.085 3.03358 12.9515 4.68629 14.2426L4.01523 16.636C3.93126 16.9351 4.20464 17.2085 4.50371 17.1245L6.89709 16.4535C8.1882 18.1062 10.0547 19.1398 12.1398 19.1398C16.5581 19.1398 20.1398 16.0058 20.1398 12.1398C20.1398 8.27376 16.5581 5.13976 12.1398 5.13976C11.4286 5.13976 10.7173 5.25367 10 5.48152V2Z"
         fill="currentColor"
         fillOpacity="0"
         stroke="currentColor"
         strokeWidth="1.5"
         strokeLinecap="round"
         strokeLinejoin="round"
       />
       {/* Re-doing MessageCircle in valid fill path style */}
       <path
          d="M10 3C6.13401 3 3 5.68629 3 9C3 10.609 3.63583 12.072 4.68412 13.1856L4.06208 15.6738C4.01919 15.8453 4.17387 16 4.35061 16L6.83883 15.378C7.9524 16.4263 9.41544 17.0621 11.0244 17.0621C14.8904 17.0621 18.0244 14.3758 18.0244 11.0621C18.0244 7.74836 14.8904 5.06207 11.0244 5.06207C10.675 5.06207 10.3344 5.0924 10 5.15077V3Z"
          fill="none" 
        />
        <path
          d="M10 2.5C5.5 2.5 2 5.5 2 9.5C2 11.5 3 13.5 4.5 14.8L4 17L6.2 16.5C7.5 18 9.5 19 12 19C16.5 19 20 16 20 12C20 8 16.5 4.5 12 4.5M10 2.5"
          fill="currentColor"
          fillRule="evenodd"
        />
        {/* Simplified fill path for 20x20 chat bubble */}
        <path
            d="M10 3.5C6.41015 3.5 3.5 6.18629 3.5 9.5C3.5 11.2341 4.25487 12.7937 5.48375 13.889C5.56041 13.9573 5.59253 14.0617 5.56708 14.1609L5.05191 16.168L7.1593 15.5786C7.26252 15.5497 7.37194 15.5762 7.45112 15.6481C8.19632 16.3251 9.07062 16.7118 10 16.7118C13.5899 16.7118 16.5 14.0255 16.5 10.7118C16.5 7.39805 13.5899 4.71176 10 4.71176V3.5ZM10 2.5C14.1421 2.5 17.5 5.85786 17.5 10 C17.5 14.1421 14.1421 17.5 10 17.5C8.80213 17.5 7.67482 17.2188 6.67134 16.711L3.5 17.5L4.28896 14.3287C3.16117 13.0978 2.5 11.3733 2.5 9.5C2.5 5.35786 5.85786 2 10 2V2.5Z"
            fill="currentColor"
        />
    </svg>
  ),
  Mail: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M3.5 5C2.67157 5 2 5.67157 2 6.5V13.5C2 14.3284 2.67157 15 3.5 15H16.5C17.3284 15 18 14.3284 18 13.5V6.5C18 5.67157 17.3284 5 16.5 5H3.5ZM3.5 6H16.5C16.7761 6 17 6.22386 17 6.5V13.5C17 13.7761 16.7761 14 16.5 14H3.5C3.22386 14 3 13.7761 3 13.5V6.5C3 6.22386 3.22386 6 3.5 6Z"
        fill="currentColor"
      />
      <path
        d="M3.5 6.5L10 10.5L16.5 6.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round" 
      />
    </svg>
  ),
  Chart: (props: IconProps) => (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path d="M4 16H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 13V16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 9V16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M14 6V16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  SEO: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
         d="M4.5 3C3.67157 3 3 3.67157 3 4.5V15.5C3 16.3284 3.67157 17 4.5 17H13.5C14.3284 17 15 16.3284 15 15.5V4.5C15 3.67157 14.3284 3 13.5 3H4.5ZM4.5 4H13.5C13.7761 4 14 4.22386 14 4.5V15.5C14 15.7761 13.7761 16 13.5 16H4.5C4.22386 16 4 15.7761 4 15.5V4.5C4 4.22386 4.22386 4 4.5 4Z"
         fill="currentColor"
      />
      <path
         d="M12.5 12.5L17.5 17.5"
         stroke="currentColor"
         strokeWidth="1"
         strokeLinecap="round"
      />
      <circle cx="12.5" cy="12.5" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
};
