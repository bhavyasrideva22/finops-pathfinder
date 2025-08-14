import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssessmentResult } from "@/types/assessment";
import { ResultsChart } from "@/components/assessment/ResultsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Share, TrendingUp, BookOpen, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('assessmentResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Cloud Cost Optimization Assessment Results',
        text: `I scored ${result?.scores.overall}% fit for Cloud Cost Optimization roles!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Results link copied to clipboard"
      });
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-accent text-accent-foreground';
      case 'Maybe': return 'bg-gradient-primary text-primary-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRecommendationMessage = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'Excellent fit! You should pursue this career path.';
      case 'Maybe': return 'Good potential with some skill development needed.';
      case 'No': return 'Consider building foundational skills first.';
      default: return '';
    }
  };

  if (!result) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Your Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Cloud Cost Optimization Analyst Career Fit Analysis
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Badge 
                className={`text-lg px-6 py-2 ${getRecommendationColor(result.recommendation)}`}
              >
                Recommendation: {result.recommendation}
              </Badge>
              <p className="text-xl font-semibold">
                {getRecommendationMessage(result.recommendation)}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {result.feedback}
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="hero" onClick={handleShare}>
                  <Share className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Download className="w-4 h-4 mr-2" />
                  Save Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="mb-8">
          <ResultsChart scores={result.scores} />
        </div>

        {/* Career Matches */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Top Career Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {result.careerMatches.map((career, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border border-border/20"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{career.role}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {career.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-primary">
                      {career.matchScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {career.salaryRange}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Gaps & Learning Path */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Skill Gaps to Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.skillGaps.length > 0 ? (
                <div className="space-y-2">
                  {result.skillGaps.map((gap, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      <span className="text-sm">{gap}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No significant skill gaps identified! You're well-prepared.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Recommended Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.learningPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Take Another Assessment
          </Button>
          <Button variant="glowing">
            Start Learning Journey
          </Button>
        </div>
      </div>
    </div>
  );
};