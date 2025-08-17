from enum import Enum


class MovementType(str, Enum):
    IN = "IN"
    OUT = "OUT"


class FinancialType(str, Enum):
    IN = "IN"
    OUT = "OUT"


class FinancialCategory(str, Enum):
    SALE = "sale"
    COST = "cost"
    SERVICE = "service"
    INPUT = "input"
    LABOR = "labor"
    TAX = "tax"


class StockUnit(str, Enum):
    KG = "kg"
    SC = "sc"  # saca (60kg)
    T = "t"
    UN = "un"
