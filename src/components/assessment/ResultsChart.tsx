import { AssessmentScore } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface ResultsChartProps {
  scores: AssessmentScore;
}

export const ResultsChart = ({ scores }: ResultsChartProps) => {
  const wiscarData = [
    { name: 'Will', value: scores.will, fill: 'hsl(199 89% 48%)' },
    { name: 'Interest', value: scores.interest, fill: 'hsl(199 89% 55%)' },
    { name: 'Skill', value: scores.skill, fill: 'hsl(199 89% 62%)' },
    { name: 'Cognitive', value: scores.cognitive, fill: 'hsl(180 25% 45%)' },
    { name: 'Ability', value: scores.ability, fill: 'hsl(180 25% 55%)' },
    { name: 'Real-World', value: scores.realWorld, fill: 'hsl(142 71% 45%)' }
  ];

  const overallData = [
    { name: 'Overall', value: scores.overall, fill: 'hsl(199 89% 48%)' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* WISCAR Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-primary">WISCAR Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart data={wiscarData} innerRadius="20%" outerRadius="90%">
              <PolarAngleAxis 
                type="number" 
                domain={[0, 100]} 
                tick={false}
              />
              <RadialBar 
                dataKey="value" 
                cornerRadius={4}
                fill="#8884d8"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {wiscarData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-semibold text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-primary">Overall Fit Score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart data={overallData} innerRadius="60%" outerRadius="90%">
              <PolarAngleAxis 
                type="number" 
                domain={[0, 100]} 
                tick={false}
              />
              <RadialBar 
                dataKey="value" 
                cornerRadius={8}
                fill="hsl(199 89% 48%)"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4">
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {scores.overall}%
            </div>
            <p className="text-muted-foreground mt-2">Career Fit Score</p>
          </div>
          
          {/* Score Breakdown */}
          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Psychometric Fit</span>
              <span className="font-semibold text-primary">{scores.psychometric}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Technical Readiness</span>
              <span className="font-semibold text-primary">{scores.technical}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};