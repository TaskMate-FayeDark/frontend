import {Outlet} from "@tanstack/react-router";

export const AuthLayout = () => {
    return (
        <div className={"min-h-screen w-full flex flex-col lg:flex-row"}>
            <div
                className="lg:flex lg:w-1/2 w-full bg-gradient-to-br from-purple-500 via-purple-400 to-orange-300 p-12 relative">
                <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold text-white mb-8">TASKMATE</h1>
                    <div className="sm:w-64 sm:h-64 w-40 h-40 mx-auto">
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-white/10 rounded-3xl shadow-xl"/>
                            <img loading={"lazy"}
                                 src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien%20Monster.png"
                                 alt="Alien Monster"/>
                            <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full"/>
                            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/20 rounded-full"/>
                            <div
                                className="absolute top-1/2 right-0 w-4 h-4 bg-white/20 rounded-full transform translate-x-1/2"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"lg:w-1/2 w-full flex flex-col justify-center items-center"}>
                <Outlet/>
            </div>
        </div>
    )
}