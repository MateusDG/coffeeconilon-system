import sqlite3

try:
    conn = sqlite3.connect(':memory:')  # Cria um banco na memória (teste)
    cursor = conn.cursor()
    cursor.execute('SELECT sqlite_version();')
    version = cursor.fetchone()
    print(f'SQLite está funcionando. Versão: {version[0]}')
    conn.close()
except Exception as e:
    print(f'Erro ao conectar no SQLite: {e}')
