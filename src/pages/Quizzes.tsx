import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Quizzes = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState([5]);
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for the quiz.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQuiz(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-quiz", {
        body: {
          topic: topic.trim(),
          difficulty,
          numQuestions: numQuestions[0],
        },
      });

      if (error) throw error;

      setQuiz(data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Practice Quizzes</h1>
          <p className="text-muted-foreground">
            Test your knowledge with AI-generated quizzes customized to your learning needs
          </p>
        </div>

        <Card className="p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Create Quiz</h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="topic" className="text-base mb-2 block">
                Topic
              </Label>
              <Input
                id="topic"
                placeholder="What topic should the quiz cover?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-base mb-3 block">Difficulty Level</Label>
              <RadioGroup
                value={difficulty}
                onValueChange={setDifficulty}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border-2 border-input rounded-lg px-6 py-3 cursor-pointer hover:border-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-accent">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy" className="cursor-pointer">
                    Easy
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-input rounded-lg px-6 py-3 cursor-pointer hover:border-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-accent">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="cursor-pointer">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-input rounded-lg px-6 py-3 cursor-pointer hover:border-primary transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-accent">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard" className="cursor-pointer">
                    Hard
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base mb-3 block">
                Number of Questions: {numQuestions[0]}
              </Label>
              <Slider
                value={numQuestions}
                onValueChange={setNumQuestions}
                min={3}
                max={15}
                step={1}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleGenerateQuiz}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              {isLoading ? "Generating Quiz..." : "Generate Quiz"}
            </Button>
          </div>
        </Card>

        {isLoading && (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Creating your quiz...</p>
            </div>
          </Card>
        )}

        {quiz && !isLoading && (
          <Card className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground whitespace-pre-wrap">{quiz.content}</div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Quizzes;
