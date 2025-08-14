import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Cloud, TrendingUp, BarChart3, Users, Clock, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Psychometric Analysis",
      description: "Evaluate personality traits and cognitive fit for cloud cost optimization roles"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Technical Assessment",
      description: "Test your knowledge of cloud platforms, pricing models, and optimization strategies"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive evaluation using Will, Interest, Skill, Cognitive, Ability, and Real-world factors"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Career Matching",
      description: "Get personalized recommendations for cloud financial roles that match your profile"
    }
  ];

  const stats = [
    { label: "Questions", value: "16", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Duration", value: "20-30 min", icon: <Clock className="w-5 h-5" /> },
    { label: "Accuracy", value: "94%", icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30">
            ☁️📉 Cloud Career Compass
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Cloud Cost Optimization
            <br />
            Career Assessment
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover if you're a perfect fit for Cloud Cost Optimization Analysis roles. 
            Get personalized insights, career recommendations, and a clear learning roadmap.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                {stat.icon}
                <span className="font-semibold text-foreground">{stat.value}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          <Button 
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/assessment')}
          >
            Start Assessment
          </Button>
        </div>

        {/* What You'll Discover */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">What You'll Discover</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions to give you accurate, actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Roles */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Target Career Roles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock these high-demand cloud financial roles with the right skills and mindset
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Cloud Cost Optimization Analyst",
                salary: "$95k-$130k",
                growth: "23% growth",
                skills: ["AWS/Azure pricing", "Data analysis", "Cost modeling"]
              },
              {
                title: "FinOps Practitioner",
                salary: "$100k-$140k",
                growth: "31% growth",
                skills: ["Cross-functional teamwork", "Cloud governance", "Financial modeling"]
              },
              {
                title: "Cloud Financial Analyst",
                salary: "$85k-$120k",
                growth: "18% growth",
                skills: ["Excel/Sheets", "Budgeting", "Forecasting"]
              }
            ].map((role, index) => (
              <Card key={index} className="hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-primary">{role.title}</CardTitle>
                    <Badge variant="outline" className="text-accent border-accent/30">
                      {role.growth}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{role.salary}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {role.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-card border-border/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Ready to Discover Your Cloud Career Potential?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take our comprehensive assessment to get personalized insights into your fit for cloud cost optimization roles.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => navigate('/assessment')}
            >
              Begin Your Assessment Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
