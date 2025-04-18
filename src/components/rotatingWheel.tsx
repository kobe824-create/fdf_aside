const RotatingWheelLoader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "spin 1s linear infinite" }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="#FF156D"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="90"
            strokeDashoffset="60"
          />
        </svg>
  
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  };

export default RotatingWheelLoader;
  