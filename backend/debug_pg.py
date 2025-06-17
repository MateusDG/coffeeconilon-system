# debug_pg.py
from app.core.config import settings
import psycopg2
import sys

print("🔍 DB_URL (repr):", repr(settings.DB_URL))
print("🔍 Comprimento:", len(settings.DB_URL))

try:
    conn = psycopg2.connect(settings.DB_URL)
    print("✅ Conectou via URI!")
    conn.close()
except Exception as e:
    print("❌ Erro ao conectar via URI:", e)

# Teste usando parâmetros separados
try:
    conn2 = psycopg2.connect(
        dbname=settings.DB_URL.split('/')[-1].split('?')[0],
        user=settings.DB_URL.split('//')[1].split(':')[0],
        password=settings.DB_URL.split('//')[1].split(':')[1].split('@')[0],
        host='localhost',
        port=5432
    )
    print("✅ Conectou via parâmetros separados!")
    conn2.close()
except Exception as e:
    print("❌ Erro ao conectar via parâmetros separados:", e)
    sys.exit(1)
