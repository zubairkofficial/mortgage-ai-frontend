import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, AlertCircle, Building2, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

type LenderRecommendation = {
  id: string;
  name: string;
  type: 'bank' | 'credit-union' | 'private-lender' | 'online-lender';
  interestRate: string;
  maxLoanAmount: string;
  processingTime: string;
  rating: number;
  matchScore: number;
  specialties: string[];
  requirements: {
    minCreditScore: number;
    maxDTI: number;
    minIncome: string;
  };
  pros: string[];
  considerations: string[];
};

type AssessmentResult = {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  qualificationStatus: 'qualified' | 'pending' | 'not-qualified';
  borrowerName: string;
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
  recommendedLenders: LenderRecommendation[];
};

export default function QualificationAssessmentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState<string | null>(null);

  // Mock borrowers from application table
  const borrowers = [
    { id: 'borrower1', name: 'John Smith' },
    { id: 'borrower2', name: 'Sarah Johnson' },
    { id: 'borrower3', name: 'Michael Davis' },
    { id: 'borrower4', name: 'Emily Wilson' }
  ];

  // Mock assessment result with lender recommendations
  const getMockAssessment = (borrowerId: string): AssessmentResult => {
    const borrower = borrowers.find(b => b.id === borrowerId);
    const borrowerName = borrower?.name || 'Unknown';

    switch (borrowerId) {
      case 'borrower1': // John Smith - High-income, excellent credit
        return {
          overallScore: 92,
          riskLevel: 'low',
          qualificationStatus: 'qualified',
          borrowerName,
          factors: {
            creditScore: {
              score: 95,
              status: 'pass',
              message: 'Excellent credit score, qualifies for premium rates'
            },
            income: {
              score: 90,
              status: 'pass',
              message: 'High stable income, excellent debt capacity'
            },
            employment: {
              score: 95,
              status: 'pass',
              message: 'Long-term executive position with Fortune 500 company'
            },
            debtToIncome: {
              score: 85,
              status: 'pass',
              message: 'Low DTI ratio, excellent financial management'
            }
          },
          recommendations: [
            'Qualifies for jumbo loan programs with premium rates',
            'Consider private banking services for comprehensive wealth management',
            'Excellent candidate for investment property financing'
          ],
          recommendedLenders: [
            {
              id: 'lender1',
              name: 'Premium Private Bank',
              type: 'bank',
              interestRate: '5.75% - 6.25%',
              maxLoanAmount: '$2,500,000',
              processingTime: '20-30 days',
              rating: 4.9,
              matchScore: 98,
              specialties: ['Jumbo Loans', 'Private Banking', 'Investment Properties'],
              requirements: {
                minCreditScore: 740,
                maxDTI: 36,
                minIncome: '$200,000'
              },
              pros: [
                'Lowest rates for high-net-worth clients',
                'Dedicated relationship manager',
                'Expedited underwriting process'
              ],
              considerations: [
                'High minimum loan amounts',
                'Requires significant assets'
              ]
            },
            {
              id: 'lender2',
              name: 'Elite Credit Union',
              type: 'credit-union',
              interestRate: '5.65% - 6.15%',
              maxLoanAmount: '$1,500,000',
              processingTime: '25-35 days',
              rating: 4.8,
              matchScore: 94,
              specialties: ['Executive Banking', 'Low Fees', 'Premium Service'],
              requirements: {
                minCreditScore: 720,
                maxDTI: 38,
                minIncome: '$150,000'
              },
              pros: [
                'Best-in-market interest rates',
                'No origination fees',
                'Flexible terms'
              ],
              considerations: [
                'Membership requirements',
                'Limited to certain professions'
              ]
            }
          ]
        };

      case 'borrower2': // Sarah Johnson - First-time buyer, good credit
        return {
          overallScore: 78,
          riskLevel: 'medium',
          qualificationStatus: 'qualified',
          borrowerName,
          factors: {
            creditScore: {
              score: 80,
              status: 'pass',
              message: 'Good credit score, qualifies for standard programs'
            },
            income: {
              score: 75,
              status: 'warning',
              message: 'Steady income but room for improvement'
            },
            employment: {
              score: 85,
              status: 'pass',
              message: 'Stable employment in healthcare sector'
            },
            debtToIncome: {
              score: 70,
              status: 'warning',
              message: 'DTI manageable but close to limits'
            }
          },
          recommendations: [
            'Perfect candidate for first-time buyer programs',
            'Consider FHA loan for lower down payment',
            'Look into down payment assistance programs'
          ],
          recommendedLenders: [
            {
              id: 'lender3',
              name: 'First Home Lending',
              type: 'online-lender',
              interestRate: '6.25% - 6.95%',
              maxLoanAmount: '$650,000',
              processingTime: '20-30 days',
              rating: 4.6,
              matchScore: 91,
              specialties: ['First-Time Buyers', 'FHA Loans', 'Down Payment Assistance'],
              requirements: {
                minCreditScore: 620,
                maxDTI: 43,
                minIncome: '$45,000'
              },
              pros: [
                'Specialized first-time buyer programs',
                'Down payment as low as 3%',
                'Educational resources included'
              ],
              considerations: [
                'Slightly higher rates',
                'PMI required for low down payments'
              ]
            },
            {
              id: 'lender4',
              name: 'Community First Bank',
              type: 'bank',
              interestRate: '6.15% - 6.75%',
              maxLoanAmount: '$750,000',
              processingTime: '30-40 days',
              rating: 4.5,
              matchScore: 87,
              specialties: ['Local Lending', 'FHA/VA Loans', 'Community Programs'],
              requirements: {
                minCreditScore: 640,
                maxDTI: 45,
                minIncome: '$40,000'
              },
              pros: [
                'Local market expertise',
                'Flexible underwriting',
                'Community involvement'
              ],
              considerations: [
                'Longer processing times',
                'Limited branch network'
              ]
            }
          ]
        };

      case 'borrower3': // Michael Davis - Self-employed, variable income
        return {
          overallScore: 68,
          riskLevel: 'medium',
          qualificationStatus: 'qualified',
          borrowerName,
          factors: {
            creditScore: {
              score: 75,
              status: 'pass',
              message: 'Fair credit score, meets minimum requirements'
            },
            income: {
              score: 60,
              status: 'warning',
              message: 'Self-employed income requires additional documentation'
            },
            employment: {
              score: 65,
              status: 'warning',
              message: 'Self-employed business owner, income variability'
            },
            debtToIncome: {
              score: 70,
              status: 'warning',
              message: 'DTI acceptable but needs careful review'
            }
          },
          recommendations: [
            'Bank statement loan programs may be ideal',
            'Provide 2 years of tax returns and P&L statements',
            'Consider asset-based loan programs'
          ],
          recommendedLenders: [
            {
              id: 'lender5',
              name: 'Self-Employed Solutions',
              type: 'private-lender',
              interestRate: '6.85% - 7.75%',
              maxLoanAmount: '$1,000,000',
              processingTime: '15-25 days',
              rating: 4.4,
              matchScore: 89,
              specialties: ['Self-Employed', 'Bank Statement Loans', 'Asset-Based Lending'],
              requirements: {
                minCreditScore: 640,
                maxDTI: 50,
                minIncome: '$60,000'
              },
              pros: [
                'Specialized in self-employed borrowers',
                'Alternative income verification',
                'Fast approval process'
              ],
              considerations: [
                'Higher interest rates',
                'Additional documentation required'
              ]
            },
            {
              id: 'lender6',
              name: 'Business Owner Bank',
              type: 'bank',
              interestRate: '6.65% - 7.45%',
              maxLoanAmount: '$800,000',
              processingTime: '25-35 days',
              rating: 4.3,
              matchScore: 85,
              specialties: ['Business Banking', 'Self-Employed Loans', 'Asset Verification'],
              requirements: {
                minCreditScore: 660,
                maxDTI: 45,
                minIncome: '$75,000'
              },
              pros: [
                'Understanding of business finances',
                'Relationship banking approach',
                'Competitive rates for self-employed'
              ],
              considerations: [
                'Stricter documentation requirements',
                'Longer approval process'
              ]
            }
          ]
        };

      case 'borrower4': // Emily Wilson - Credit challenges, lower income
        return {
          overallScore: 58,
          riskLevel: 'high',
          qualificationStatus: 'pending',
          borrowerName,
          factors: {
            creditScore: {
              score: 55,
              status: 'warning',
              message: 'Credit score needs improvement, limited loan options'
            },
            income: {
              score: 65,
              status: 'warning',
              message: 'Income sufficient but limited borrowing capacity'
            },
            employment: {
              score: 75,
              status: 'pass',
              message: 'Stable employment in education sector'
            },
            debtToIncome: {
              score: 45,
              status: 'fail',
              message: 'High DTI ratio, debt consolidation recommended'
            }
          },
          recommendations: [
            'Consider credit repair services before applying',
            'Explore FHA loans with credit overlays',
            'Look into first-time buyer assistance programs',
            'Consider debt consolidation to improve DTI'
          ],
          recommendedLenders: [
            {
              id: 'lender7',
              name: 'Second Chance Lending',
              type: 'online-lender',
              interestRate: '7.25% - 8.95%',
              maxLoanAmount: '$400,000',
              processingTime: '20-30 days',
              rating: 4.1,
              matchScore: 82,
              specialties: ['Credit Challenges', 'FHA Specialists', 'Credit Repair Programs'],
              requirements: {
                minCreditScore: 580,
                maxDTI: 50,
                minIncome: '$35,000'
              },
              pros: [
                'Accepts lower credit scores',
                'Credit improvement guidance',
                'Flexible qualification criteria'
              ],
              considerations: [
                'Higher interest rates',
                'May require mortgage insurance'
              ]
            },
            {
              id: 'lender8',
              name: 'Community Development Bank',
              type: 'credit-union',
              interestRate: '6.95% - 7.85%',
              maxLoanAmount: '$350,000',
              processingTime: '35-45 days',
              rating: 4.2,
              matchScore: 78,
              specialties: ['Affordable Housing', 'Community Development', 'Credit Building'],
              requirements: {
                minCreditScore: 600,
                maxDTI: 48,
                minIncome: '$30,000'
              },
              pros: [
                'Community-focused lending',
                'Down payment assistance available',
                'Credit counseling services'
              ],
              considerations: [
                'Longer processing times',
                'Income and location restrictions'
              ]
            }
          ]
        };

      default:
        return {
          overallScore: 78,
          riskLevel: 'medium',
          qualificationStatus: 'qualified',
          borrowerName,
          factors: {
            creditScore: { score: 85, status: 'pass', message: 'Good credit score, meets minimum requirements' },
            income: { score: 75, status: 'warning', message: 'Income is sufficient but could be higher for better rates' },
            employment: { score: 90, status: 'pass', message: 'Stable employment history' },
            debtToIncome: { score: 65, status: 'warning', message: 'DTI ratio is slightly high' }
          },
          recommendations: [
            'Consider increasing down payment to improve loan terms',
            'Explore debt consolidation options to improve DTI ratio',
            'Maintain current credit score for better interest rates'
          ],
          recommendedLenders: []
        };
    }
  };

  const handleRunAssessment = async (borrowerId: string | null) => {
    if (!borrowerId) return;
    setIsProcessing(true);
    // Use borrowerId in your API call here
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAssessmentResult(getMockAssessment(borrowerId));
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

  const getLenderTypeColor = (type: string) => {
    switch (type) {
      case 'bank':
        return 'bg-blue-100 text-blue-800';
      case 'credit-union':
        return 'bg-green-100 text-green-800';
      case 'private-lender':
        return 'bg-purple-100 text-purple-800';
      case 'online-lender':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Qualification Assessment</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Run Assessment'
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Borrower</DialogTitle>
            </DialogHeader>
            <select
              className="w-full mb-4 p-2 border rounded-md"
              value={selectedBorrower || ''}
              onChange={(e) => setSelectedBorrower(e.target.value)}
            >
              <option value="" disabled>Select a borrower</option>
              {borrowers.map(borrower => (
                <option key={borrower.id} value={borrower.id}>{borrower.name}</option>
              ))}
            </select>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  handleRunAssessment(selectedBorrower);
                }}
                disabled={!selectedBorrower}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {assessmentResult && (
        <div className="space-y-6">
          {/* Borrower Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Assessment Results for {assessmentResult.borrowerName}
                <Badge variant={
                  assessmentResult.qualificationStatus === 'qualified' ? 'default' :
                  assessmentResult.qualificationStatus === 'pending' ? 'secondary' :
                  'destructive'
                }>
                  {assessmentResult.qualificationStatus.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

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

          {/* Recommended Lenders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Recommended Lenders for {assessmentResult.borrowerName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessmentResult.recommendedLenders.map((lender) => (
                  <Card key={lender.id} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{lender.name}</CardTitle>
                          <Badge className={`mt-2 ${getLenderTypeColor(lender.type)}`}>
                            {lender.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {renderStars(lender.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{lender.rating}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                        <span className="font-medium">Match Score</span>
                        <Badge variant="default">{lender.matchScore}%</Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Interest Rate</p>
                          <p className="text-lg font-bold text-primary">{lender.interestRate}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="font-medium">Max Loan</p>
                            <p>{lender.maxLoanAmount}</p>
                          </div>
                          <div>
                            <p className="font-medium">Processing</p>
                            <p>{lender.processingTime}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Specialties</p>
                          <div className="flex flex-wrap gap-1">
                            {lender.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Pros</p>
                          <ul className="space-y-1">
                            {lender.pros.map((pro, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {lender.considerations.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Considerations</p>
                            <ul className="space-y-1">
                              {lender.considerations.map((consideration, index) => (
                                <li key={index} className="flex items-start gap-2 text-xs">
                                  <AlertCircle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <span>{consideration}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button className="w-full">
                        Connect with {lender.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Lender Matching Criteria</h4>
                <p className="text-sm text-muted-foreground">
                  Lenders are ranked based on borrower profile compatibility, interest rates, processing time, 
                  and historical approval rates. Match scores above 80% indicate high compatibility.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 