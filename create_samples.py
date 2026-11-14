import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

from docx import Document

# 1. Create Sample PDF
pdf_path = "Sample_Astronomy_Lesson.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=54, leftMargin=54, topMargin=54, bottomMargin=54)

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=colors.HexColor('#1E1B4B'),
    spaceAfter=14
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=11,
    leading=16,
    textColor=colors.HexColor('#334155'),
    spaceAfter=12
)

story = [
    Paragraph("The Solar System and Planetary Dynamics", title_style),
    Paragraph("The Solar System is a gravitationally bound planetary system comprising the Sun and the astronomical objects that orbit it. Formed approximately 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud, the system predominantly concentrates 99.86% of its aggregate mass within the Sun.", body_style),
    Paragraph("The eight recognized planets are categorized into two primary classifications: terrestrial inner planets and Jovian giant outer planets. Mercury, Venus, Earth, and Mars constitute the terrestrial planets, which possess solid rocky surfaces and high mean densities. In contrast, Jupiter and Saturn represent gas giants composed primarily of hydrogen and helium, while Uranus and Neptune are classified as ice giants containing substantial quantities of water, ammonia, and methane.", body_style),
    Paragraph("Planetary motion conforms rigorously to Johannes Kepler's three laws of orbital mechanics published between 1609 and 1619. According to Kepler's first law, planets orbit the Sun along elliptical trajectories with the Sun situated at one focal point. Furthermore, Isaac Newton subsequently formulated the law of universal gravitation, demonstrating that the gravitational attraction between two celestial bodies is directly proportional to the product of their masses and inversely proportional to the square of the distance separating them.", body_style),
    Paragraph("Earth maintains an average orbital velocity of approximately 29.8 kilometers per second and completes a single revolution around the Sun every 365.25 days. The presence of a protective magnetosphere and liquid surface water facilitates optimal conditions for sustaining biological organisms across global ecosystems.", body_style)
]

doc.build(story)
print(f"Created PDF: {os.path.abspath(pdf_path)}")

# 2. Also Create a Sample DOCX for testing Word files
docx_path = "Sample_Biology_Lesson.docx"
wdoc = Document()
wdoc.add_heading("Ecosystems and Cellular Energy Flow", level=1)
wdoc.add_paragraph("An ecosystem represents a dynamic biological community of interacting organisms coupled with their physical abiotic environment. Energy enters predominantly via electromagnetic radiation emitted by the Sun, which primary producers assimilate through biochemical pathways.")
wdoc.add_paragraph("Cellular respiration constitutes the metabolic pathway by which aerobic organisms extract adenosine triphosphate (ATP) from organic nutrients. This fundamental bioenergetic transformation occurs within the inner membrane of mitochondria.")
wdoc.add_paragraph("In 2024, conservation scientists identified that maintaining high biodiversity substantially improves ecological stability against climatic disturbances. Approximately 80% of terrestrial biodiversity resides within global forest ecosystems.")
wdoc.save(docx_path)
print(f"Created DOCX: {os.path.abspath(docx_path)}")
