import psycopg2 # type: ignore

try:
    conn = psycopg2.connect(
        dbname="pycaretdetails",
        user="pycaretdetails_user",
        password="3XE0x25dOARRDsf5k45NzX76qbfnYWO7",
        host="dpg-cvdeo05svqrc73eg2jl0-a",  # Change this to the correct IP if possible
        port=5432
    )
    conn.close()
    print("✅ Database connected successfully!")
except Exception as e:
    print("❌ Database connection failed:", e)
