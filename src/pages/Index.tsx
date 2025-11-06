import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, ClipboardList, Brain, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Tutor",
      description: "Get personalized explanations for any topic",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      href: "/tutor",
    },
    {
      title: "Smart Notes",
      description: "Generate structured notes instantly",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      href: "/notes",
    },
    {
      title: "Practice Quizzes",
      description: "Test your knowledge with AI-generated quizzes",
      icon: ClipboardList,
      color: "bg-purple-100 text-purple-600",
      href: "/quizzes",
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">Powered by AI</span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to ClassMate AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent study companion that helps you learn faster and retain more through AI-powered explanations, notes, and quizzes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(feature.href)}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Start Learning Smarter</h2>
              <p className="text-muted-foreground mb-4">
                Whether you need help understanding complex topics, creating study materials, or testing your knowledge, ClassMate AI is here to support your learning journey.
              </p>
              <Button size="lg" onClick={() => navigate("/tutor")}>
                <BookOpen className="w-4 h-4 mr-2" />
                Start with AI Tutor
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Personalized Learning</h3>
            <p className="text-sm text-muted-foreground">
              AI adapts to your learning level
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Track Progress</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your study history
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Smart Content</h3>
            <p className="text-sm text-muted-foreground">
              AI-generated study materials
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
