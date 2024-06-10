import random
import csv
def generate_csv():
# Define the number of rows to generate
  num_rows = 672

# Generate the data for the CSV file
  data = [[random.randint(3000, 6000), random.randint(3000, 6000)] for i in range(num_rows)]

# Write the data to a new CSV file
  with open('random_data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['generation fossil gas', 'generation fossil hard coal'])
    writer.writerows(data)