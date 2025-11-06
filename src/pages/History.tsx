import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Clock, ClipboardList, FileText, BookOpen } from "lucide-react";

const mockHistory = [
  {
    id: 1,
    title: "Photosynthesis",
    type: "quiz",
    timestamp: "2 hours ago",
    score: "85%",
    icon: ClipboardList,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 2,
    title: "Blockchain Technology",
    type: "explanation",
    timestamp: "5 hours ago",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "World War II Timeline",
    type: "note",
    timestamp: "Yesterday",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Calculus Derivatives",
    type: "quiz",
    timestamp: "Yesterday",
    score: "92%",
    icon: ClipboardList,
    color: "bg-purple-100 text-purple-600",
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <Layout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Study History</h1>
          <p className="text-muted-foreground">
            Review your past study sessions, notes, and quiz results
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your study history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {["All", "Explanations", "Notes", "Quizzes"].map((item) => (
              <Button
                key={item}
                variant={filter === item.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(item.toLowerCase())}
              >
                {item}
              </Button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{item.timestamp}</span>
                      {item.score && (
                        <>
                          <span className="mx-1">•</span>
                          <span>Score: {item.score}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium capitalize">
                  {item.type === "explanation" ? "AI Explanation" : item.type}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default History;
