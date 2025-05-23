import { cn } from "@/lib/utils";
import "./loader.css";

export const Loader = () => {
  return (
    <div
      className="coffee"
      role="img"
      aria-label="Coffee cup spinning and stretching from side to side"
    >
      <div className="coffee__cup">
        <div className="coffee__cup-part coffee__cup-part--a"></div>
        <div className="coffee__cup-part coffee__cup-part--b"></div>
        <div className="coffee__cup-part coffee__cup-part--c"></div>
        <div className="coffee__cup-part coffee__cup-part--d"></div>
        <div className="coffee__cup-part coffee__cup-part--e"></div>
        <svg
          className="coffee__cup-part coffee__cup-part--f"
          width="96px"
          height="60px"
          viewBox="0 0 96 60"
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path
              className="coffee__cup-handle"
              d="M64,4.413s6.64-2.913,11-2.913c11.739,0,19.5,10.759,19.5,22.497,0,23.475-45,22.497-45,22.497"
            />
          </g>
        </svg>
      </div>
      <svg
        className="coffee__steam"
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path
            className="coffee__steam-part coffee__steam-part--a"
            d="M13.845,54s-5.62-10.115-4.496-16.859,6.83-11.497,8.992-17.983c1.037-3.11,.161-6.937-1.083-10.158"
          />
          <path
            className="coffee__steam-part coffee__steam-part--b"
            d="M27.844,54s-5.652-10.174-4.522-16.957,6.869-11.564,9.043-18.087c2.261-6.783-4.522-16.957-4.522-16.957"
          />
          <path
            className="coffee__steam-part coffee__steam-part--c"
            d="M40.434,50.999c-1.577-3.486-3.818-9.462-3.071-13.944,1.121-6.723,6.809-11.462,8.964-17.928,1.033-3.1,.161-6.916-1.08-10.127"
          />
        </g>
      </svg>
      <svg
        className="coffee__steam coffee__steam--right"
        width="56px"
        height="56px"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path
            className="coffee__steam-part coffee__steam-part--d"
            d="M19.845,54s-5.62-10.115-4.496-16.859,6.83-11.497,8.992-17.983c1.037-3.11,.161-6.937-1.083-10.158"
          />
          <path
            className="coffee__steam-part coffee__steam-part--e"
            d="M34.434,44c-1.577-3.486-3.818-9.462-3.071-13.944,1.121-6.723,6.809-11.462,8.964-17.928,1.033-3.1,.161-6.916-1.08-10.127"
          />
        </g>
      </svg>
    </div>
  );
};

export const LoaderDots = (className?: string) => {
  return <span className={cn("loader", className)}></span>;
};
