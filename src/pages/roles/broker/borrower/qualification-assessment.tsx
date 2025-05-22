import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type AssessmentResult = {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  qualificationStatus: 'qualified' | 'pending' | 'not-qualified';
  factors: {
    creditScore: {
      score: number;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    };
    income: {
      score: number;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    };
    employment: {
      score: number;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    };
    debtToIncome: {
      score: number;
      status: 'pass' | 'fail' | 'warning';
      message: string;
    };
  };
  recommendations: string[];
};

export default function QualificationAssessmentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Mock assessment result
  const mockAssessment: AssessmentResult = {
    overallScore: 78,
    riskLevel: 'medium',
    qualificationStatus: 'qualified',
    factors: {
      creditScore: {
        score: 85,
        status: 'pass',
        message: 'Good credit score, meets minimum requirements'
      },
      income: {
        score: 75,
        status: 'warning',
        message: 'Income is sufficient but could be higher for better rates'
      },
      employment: {
        score: 90,
        status: 'pass',
        message: 'Stable employment history'
      },
      debtToIncome: {
        score: 65,
        status: 'warning',
        message: 'DTI ratio is slightly high'
      }
    },
    recommendations: [
      'Consider increasing down payment to improve loan terms',
      'Explore debt consolidation options to improve DTI ratio',
      'Maintain current credit score for better interest rates'
    ]
  };

  const handleRunAssessment = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAssessmentResult(mockAssessment);
    setIsProcessing(false);
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'text-green-500';
      case 'fail':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Qualification Assessment</h1>
        <Button onClick={handleRunAssessment} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Run Assessment'
          )}
        </Button>
      </div>

      {assessmentResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Score</span>
                    <Badge variant={
                      assessmentResult.riskLevel === 'low' ? 'default' :
                      assessmentResult.riskLevel === 'medium' ? 'secondary' :
                      'destructive'
                    }>
                      {assessmentResult.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress value={assessmentResult.overallScore} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {assessmentResult.overallScore}% - {assessmentResult.qualificationStatus === 'qualified' ? 'Qualified' : 'Not Qualified'}
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(assessmentResult.factors).map(([key, factor]) => (
                    <div key={key} className="flex items-start gap-4">
                      {getStatusIcon(factor.status)}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className={`text-sm ${getStatusColor(factor.status)}`}>
                            {factor.score}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{factor.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Next Steps</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Review and discuss recommendations with borrower</li>
                  <li>• Gather additional documentation if needed</li>
                  <li>• Proceed with loan structuring if qualified</li>
                  <li>• Consider alternative options if not qualified</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 