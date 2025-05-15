import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CardData {
  title: string
  value: string
  trend: "up" | "down"
  trendValue: string
  message: string
  description: string
}

export function SectionCards() {
  const cardsData: CardData[] = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      trend: "up",
      trendValue: "+12.5%",
      message: "Trending up this month",
      description: "Visitors for the last 6 months"
    },
    {
      title: "New Customers",
      value: "1,234",
      trend: "down",
      trendValue: "-20%",
      message: "Down 20% this period",
      description: "Acquisition needs attention"
    },
    {
      title: "Active Accounts",
      value: "45,678",
      trend: "up",
      trendValue: "+12.5%",
      message: "Strong user retention",
      description: "Engagement exceed targets"
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      trend: "up",
      trendValue: "+4.5%",
      message: "Steady performance increase",
      description: "Meets growth projections"
    }
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsData.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trend === "up" ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trendValue}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.message} {card.trend === "up" ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
            </div>
            <div className="text-muted-foreground">
              {card.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
