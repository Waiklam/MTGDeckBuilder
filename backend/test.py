import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="pass123",
    auth_plugin="mysql_native_password",
    database="testdb"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM students")

myresult = mycursor.fetchall()

for row in myresult:
    print(row)