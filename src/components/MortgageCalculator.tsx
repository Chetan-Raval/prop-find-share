
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calculator, IndianRupee, TrendingUp, Home } from 'lucide-react';

interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  emi: number;
  totalInterest: number;
  totalAmount: number;
}

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    loanAmount: 0,
    interestRate: 0,
    loanTenure: 0,
    emi: 0,
    totalInterest: 0,
    totalAmount: 0
  });

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  useEffect(() => {
    const loanAmount = propertyPrice - downPayment;
    const emi = calculateEMI(loanAmount, interestRate, loanTenure);
    const totalAmount = emi * loanTenure * 12;
    const totalInterest = totalAmount - loanAmount;

    setLoanDetails({
      loanAmount,
      interestRate,
      loanTenure,
      emi,
      totalInterest,
      totalAmount
    });
  }, [propertyPrice, downPayment, interestRate, loanTenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getAffordabilityStatus = () => {
    const emiToIncomeRatio = (loanDetails.emi / monthlyIncome) * 100;
    if (emiToIncomeRatio <= 30) return { status: 'Excellent', color: 'bg-green-500', text: 'Very Affordable' };
    if (emiToIncomeRatio <= 40) return { status: 'Good', color: 'bg-yellow-500', text: 'Affordable' };
    if (emiToIncomeRatio <= 50) return { status: 'Moderate', color: 'bg-orange-500', text: 'Manageable' };
    return { status: 'High Risk', color: 'bg-red-500', text: 'Not Recommended' };
  };

  const loanComparisons = [
    { bank: "SBI Home Loan", rate: 8.40, processing: 0.35 },
    { bank: "HDFC Home Loan", rate: 8.60, processing: 0.50 },
    { bank: "ICICI Home Loan", rate: 8.75, processing: 0.50 },
    { bank: "Axis Bank Home Loan", rate: 8.80, processing: 0.75 },
    { bank: "LIC Housing Finance", rate: 8.45, processing: 0.25 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Calculator className="text-blue-600" />
          Mortgage Calculator & Financing Tools
        </h1>
        <p className="text-gray-600">Calculate EMI, assess affordability, and compare loan options</p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">EMI Calculator</TabsTrigger>
          <TabsTrigger value="affordability">Affordability</TabsTrigger>
          <TabsTrigger value="comparison">Loan Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Loan Details
                </CardTitle>
                <CardDescription>Enter your property and loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyPrice">Property Price</Label>
                  <Input
                    id="propertyPrice"
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500">{formatCurrency(propertyPrice)}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-sm text-gray-500">{formatCurrency(downPayment)} ({((downPayment/propertyPrice)*100).toFixed(1)}%)</p>
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate: {interestRate}% per annum</Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={15}
                    min={6}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loan Tenure: {loanTenure} years</Label>
                  <Slider
                    value={[loanTenure]}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    max={30}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Calculation Results
                </CardTitle>
                <CardDescription>Your EMI and loan breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Monthly EMI</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(loanDetails.emi)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Loan Amount</p>
                    <p className="font-semibold">{formatCurrency(loanDetails.loanAmount)}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Total Interest</p>
                    <p className="font-semibold">{formatCurrency(loanDetails.totalInterest)}</p>
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600 font-medium">Total Amount Payable</p>
                  <p className="text-xl font-bold text-orange-700">{formatCurrency(loanDetails.totalAmount)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Principal</span>
                    <span>{((loanDetails.loanAmount/loanDetails.totalAmount)*100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Interest</span>
                    <span>{((loanDetails.totalInterest/loanDetails.totalAmount)*100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full" 
                      style={{width: `${(loanDetails.loanAmount/loanDetails.totalAmount)*100}%`}}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affordability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Affordability Assessment
              </CardTitle>
              <CardDescription>Check if this loan fits your budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">{formatCurrency(monthlyIncome)}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">EMI to Income Ratio</h3>
                    <p className="text-2xl font-bold text-blue-700">
                      {((loanDetails.emi / monthlyIncome) * 100).toFixed(1)}%
                    </p>
                    <Badge className={`mt-2 ${getAffordabilityStatus().color} text-white`}>
                      {getAffordabilityStatus().status}
                    </Badge>
                    <p className="text-sm text-blue-600 mt-1">{getAffordabilityStatus().text}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monthly EMI</span>
                      <span className="font-semibold">{formatCurrency(loanDetails.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Income</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(monthlyIncome - loanDetails.emi)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Affordability Guidelines</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Up to 30%: Excellent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>30-40%: Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span>40-50%: Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Above 50%: High Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Comparison</CardTitle>
              <CardDescription>Compare interest rates and processing fees from different lenders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Lender</th>
                      <th className="text-left p-3">Interest Rate</th>
                      <th className="text-left p-3">Processing Fee</th>
                      <th className="text-left p-3">EMI</th>
                      <th className="text-left p-3">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanComparisons.map((loan, index) => {
                      const emi = calculateEMI(loanDetails.loanAmount, loan.rate, loanTenure);
                      const totalInterest = (emi * loanTenure * 12) - loanDetails.loanAmount;
                      return (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{loan.bank}</td>
                          <td className="p-3">{loan.rate}%</td>
                          <td className="p-3">{loan.processing}%</td>
                          <td className="p-3 font-semibold">{formatCurrency(emi)}</td>
                          <td className="p-3">{formatCurrency(totalInterest)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MortgageCalculator;
