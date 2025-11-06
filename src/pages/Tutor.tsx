import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { BookOpen, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Tutor = () => {
  const [question, setQuestion] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExplain = async () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a topic or question to get started.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setExplanation("");

    try {
      const { data, error } = await supabase.functions.invoke("explain-topic", {
        body: { question: question.trim() },
      });

      if (error) throw error;

      setExplanation(data.explanation);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate explanation. Please try again.",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Tutor</h1>
          <p className="text-muted-foreground">
            Ask any question and get clear, detailed explanations tailored to your learning level
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Ask Your Question</h2>
            </div>

            <Textarea
              placeholder="What topic would you like to understand? (e.g., 'Explain photosynthesis' or 'How does blockchain work?')"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[200px] mb-4 resize-none"
            />

            <Button
              onClick={handleExplain}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {isLoading ? "Explaining..." : "Explain This"}
            </Button>
          </Card>

          <Card className="p-6">
            {!explanation && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Brain className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                  Enter a topic and click "Explain This" to get started
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Generating explanation...</p>
              </div>
            )}

            {explanation && !isLoading && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Explanation</h2>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">{explanation}</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tutor;
