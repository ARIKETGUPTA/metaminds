import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Notes = () => {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateNotes = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate notes.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setNotes("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-notes", {
        body: { topic: topic.trim() },
      });

      if (error) throw error;

      setNotes(data.notes);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate notes. Please try again.",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Smart Notes</h1>
          <p className="text-muted-foreground">
            Generate structured, comprehensive notes from any topic or study material
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Generate Notes</h2>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter topic or paste content..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerateNotes}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "Generating..." : "Generate Notes"}
            </Button>
          </div>
        </Card>

        {isLoading && (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Creating comprehensive notes...</p>
            </div>
          </Card>
        )}

        {notes && !isLoading && (
          <Card className="p-6">
            <div className="prose prose-sm max-w-none">
              <div className="text-foreground whitespace-pre-wrap">{notes}</div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Notes;
