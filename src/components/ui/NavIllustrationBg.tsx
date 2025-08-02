import imageSrc from "../../assets/Group.svg";

const NavIllustrationBg = () => {
  return (
    <div className="relative h-40 w-20 opacity-20 pointer-events-none">
      <div>
        <p> Tomas </p>
        <h1> Welcome to Dashboard</h1>
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at top left, #56cd9bff -20%, transparent 20%),
            radial-gradient(circle at bottom right, #488a6eff -10%, transparent 40%)
          `,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>


      <img
        src={imageSrc.src}
        alt="Illustration"
        className="relative z-10 w-full h-full object-contain"
      />
    </div>
  );
};

export default NavIllustrationBg;
