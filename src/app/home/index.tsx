import {useState} from 'react';
import {Button} from "../../components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card";
import {ChevronRight, Star} from 'lucide-react';

const features = [
    {
        title: "Search & Organize",
        description:
            "Powerful search capabilities to find any piece of information quickly and efficiently.",
    },
    {
        title: "Team Collaboration",
        description:
            "Work together seamlessly with real-time updates and shared workspaces.",
    },
    {
        title: "Smart Integration",
        description:
            "Connect with your existing tools and workflows for maximum productivity.",
    },
    {
        title: "Security First",
        description:
            "Enterprise-grade security to keep your company's knowledge safe and protected.",
    },
    {
        title: "Custom Workflows",
        description:
            "Create and customize workflows that match your team's unique needs.",
    },
    {
        title: "Analytics & Insights",
        description:
            "Get detailed insights into how your team uses and interacts with information.",
    },
]

const testimonials = [
    {
        content:
            "Klu has transformed how we manage and share knowledge within our team.",
        name: "Sarah Johnson",
        role: "Product Manager",
    },
    {
        content:
            "The search functionality is incredible. We can find anything in seconds.",
        name: "Michael Chen",
        role: "Tech Lead",
    },
    {
        content:
            "Integration with our existing tools was smooth and straightforward.",
        name: "Emily Rodriguez",
        role: "Operations Director",
    },
    {
        content: "The best knowledge management platform we've ever used.",
        name: "David Kim",
        role: "CEO",
    },
]

export const HomePage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Navigation */}
            <nav className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-xl font-bold text-blue-600">
                            TaskMate
                        </a>
                        <div className="hidden md:flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Features
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Pricing
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button onClick={toggleMobileMenu} className={"md:hidden"} variant="outline" size="icon">
                            <ChevronRight/> </Button>
                        <Button variant="outline" className="hidden md:block">
                            Get Started
                        </Button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="flex flex-col items-start gap-4 px-4 py-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Features
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Pricing
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold leading-tight text-gray-900">
                            Manage team work with TaskMate
                        </h1>
                        <p className="text-gray-600 text-xl">
                            Organize, track, and manage your team's tasks in one place.
                        </p>
                        <Button variant="outline" className="px-6 py-3">
                            Get Started for Free
                        </Button>
                    </div>
                    <div
                        className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-lg">
                        {/* Placeholder for demo/screenshot */}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border border-gray-200 shadow-md rounded-lg">
                            <CardHeader>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                    What Our Users Say
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border border-gray-200 shadow-md rounded-lg">
                            <CardContent>
                                <div className="flex gap-1 mb-4 mt-[10px]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="text-yellow-500"/>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-0.5 text-start">{testimonial.content}</p>
                                <div className={"text-start"}>
                                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4 pt-12 pb-[10px] text-center">
                    <p className="text-gray-600">© 2024 TaskMate. All rights reserved.</p>
                    <a href="https://github.com/devhatebug" target="_blank" className="text-gray-600">
                        devhatebug
                    </a>
                </div>
            </footer>
        </div>
    )
}