export default function Outline({ color }: { color: string }) {
  return (
    <svg
      width="74"
      height="34"
      viewBox="0 0 74 34"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_1926_37355" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M74 0H2V3H0V34H72V31H74V0Z"
        />
      </mask>
      <path
        d="M2 0V-1H1V0H2ZM74 0H75V-1H74V0ZM2 3V4H3V3H2ZM0 3V2H-1V3H0ZM0 34H-1V35H0V34ZM72 34V35H73V34H72ZM72 31V30H71V31H72ZM74 31V32H75V31H74ZM2 1H74V-1H2V1ZM3 3V0H1V3H3ZM0 4H2V2H0V4ZM1 34V3H-1V34H1ZM72 33H0V35H72V33ZM71 31V34H73V31H71ZM74 30H72V32H74V30ZM73 0V31H75V0H73Z"
        fill={color}
        mask="url(#path-1-inside-1_1926_37355)"
      />
    </svg>
  );
}
