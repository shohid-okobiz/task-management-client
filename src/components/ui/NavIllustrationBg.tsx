import imageSrc from "../../assets/signuplogo.png";
import signupbgImg from '../../assets/Rectangle-bg.png';

const NavIllustrationBg = () => {
  return (
    <div className="relative h-50 w-full overflow-hidden">
      {/* Content Section */}
      <div className="relative z-20 p-8">
        <p className="text-lg text-gray-600 mb-2">Tomas</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Dashboard
        </h1>
      </div>

     
      <div  
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at left, rgba(134, 239, 172, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at right, rgba(134, 239, 172, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.6) 40%, transparent 70%),
            url(${signupbgImg.src})
          `,
          backgroundSize: 'cover, cover, cover, cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center left, center right, center, center',
        }}
      />

     
      <div className="absolute top-4 right-0 z-10 p-4">
        <img
          src={imageSrc.src}
          alt="Dashboard Illustration"
          className="w-md h-50 object-contain opacity-80 drop-shadow-xl"
        />
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent z-5" />
      
      {/* Subtle animated background particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-60 animate-ping" />
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-green-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default NavIllustrationBg;