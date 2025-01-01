import { TestimonialCard } from "./Testimonial_Card";

const testimonials = [
  {
    content: "DebtDetox helped me clear $45,000 in debt in just 18 months. The strategies and tools they provided were invaluable.",
    author: "Sarah Johnson",
    role: "Software Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    content: "The debt prioritization feature saved me thousands in interest. I can't recommend this platform enough.",
    author: "Michael Chen",
    role: "Small Business Owner",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    content: "Finally, a debt management tool that actually works! The interface is intuitive and the insights are incredibly helpful.",
    author: "Emily Rodriguez",
    role: "Teacher",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  }
];

export function TestimonialSection() {
  return (
    <section className="py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-zinc-400">Join thousands who've transformed their financial future</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}