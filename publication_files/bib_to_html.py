import sys

import bibtexparser


with open(sys.argv[1], "r") as citation_in:
	papers = dict()

	for line in citation_in.readlines():
		if "@" in line:
			new_entry = True
			temp_dict = dict()
		elif new_entry:
			line = line.strip().split("=")
			if line[0] == "}":
				new_entry = False
				# print(temp_dict)
				papers[temp_dict["title"]] = temp_dict
			else:
				line[1] = line[1].replace('{', '')
				line[1] = line[1].replace('}', '')
				line[1] = line[1].strip(',')
				line[1] = line[1].strip(' ')
				# print(line[1])
				temp_dict[line[0].strip(' ')] = line[1]

	for paper in papers:
		paper = papers.get(paper)
		paper["author"] = [x.split(", ") for x in paper["author"].split(" and ")]
		
		aut_list = []
		for x in paper["author"]:
			temp = x[1].split(" ")
			if len(temp) == 1:
				first_initial = temp[0][0]
				aut_list.append(x[0] + " "+first_initial + ".")
			elif len(temp) == 2:
				first_initial = temp[0][0]
				second_initial = temp[1]
				aut_list.append(x[0] + " " + first_initial + "."+ second_initial+ ".")
		if len(aut_list) > 2:
			paper["author"] = ", ".join(aut_list[0:len(aut_list)-1]) + " and " + aut_list[len(aut_list)-1]
		else:
			paper["author"] = " and ".join(aut_list)
		#print(paper["title"])
		if "volume" in paper:
			print("<li><strong>" + paper["title"] + "</strong> " + paper["journal"].upper() + ". " + paper["author"] + " " + paper["year"] +"; " + paper["volume"] + ": " + paper["pages"] + "</li>\n")
		else:
			print("<li><strong>" + paper["title"] + "</strong> " + paper["journal"].upper() + ". " + paper["author"] + " " + paper["year"] + "</li>\n")

