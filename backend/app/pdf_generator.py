import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf_report(recommendation_data: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#475569'),
        spaceAfter=15
    )

    heading2_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=12,
        spaceAfter=8
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155')
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    disclaimer_style = ParagraphStyle(
        'Disclaimer',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#64748B'),
        spaceBefore=15
    )

    story = []

    # Title & Header
    story.append(Paragraph("Eco-PackAI — Smart Food Packaging Report", title_style))
    story.append(Paragraph("AI-Powered Packaging Science & Decision Support Analysis", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0EA5E9'), spaceAfter=15))

    # Summary Table
    product_name = recommendation_data.get("product", "Food Product")
    summary = recommendation_data.get("input_summary", {})
    
    table_data = [
        [Paragraph("<b>Parameter</b>", body_style), Paragraph("<b>Target User Value</b>", body_style)],
        [Paragraph("Product Name", body_style), Paragraph(product_name, body_style)],
        [Paragraph("Target Shelf Life", body_style), Paragraph(summary.get("Shelf life", "-"), body_style)],
        [Paragraph("Storage Condition", body_style), Paragraph(summary.get("Storage", "-"), body_style)],
        [Paragraph("Transportation Distance", body_style), Paragraph(summary.get("Transportation", "-"), body_style)],
        [Paragraph("User Priority", body_style), Paragraph(summary.get("Priority", "-"), body_style)],
        [Paragraph("Report Confidence", body_style), Paragraph(f"<b>{recommendation_data.get('confidence_level', 'High')}</b>", body_style)]
    ]

    t = Table(table_data, colWidths=[180, 330])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (1,0), colors.HexColor('#F1F5F9')),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#0F172A')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 15))

    # Recommended Packaging Section
    story.append(Paragraph("1. Recommended Packaging Solution", heading2_style))
    rec_pack = recommendation_data.get("recommended_packaging", {})
    
    story.append(Paragraph(f"<b>{rec_pack.get('name', 'Recommended Packaging')}</b>", ParagraphStyle('RecTitle', parent=body_style, fontSize=12, fontName='Helvetica-Bold', textColor=colors.HexColor('#0284C7'))))
    story.append(Paragraph(f"Category: {rec_pack.get('category', 'Flexible')}", body_style))
    story.append(Paragraph(f"Materials: {rec_pack.get('materials', 'High-barrier film')}", body_style))
    story.append(Paragraph(f"Description: {rec_pack.get('description', '')}", body_style))
    story.append(Spacer(1, 10))

    # Why We Recommend This
    story.append(Paragraph("Why We Recommend This Solution:", ParagraphStyle('WhyTitle', parent=body_style, fontName='Helvetica-Bold')))
    for reason in recommendation_data.get("why_recommended", []):
        story.append(Paragraph(f"• {reason}", bullet_style))
    story.append(Spacer(1, 12))

    # Technical Details
    story.append(Paragraph("2. Technical Specifications & Engineering Targets", heading2_style))
    tech = rec_pack.get("technical_details", {})
    tech_table_data = [
        [Paragraph("<b>Technical Parameter</b>", body_style), Paragraph("<b>Target Specification Range</b>", body_style)],
        [Paragraph("Suggested Thickness Range", body_style), Paragraph(str(tech.get("suggested_thickness_range", "70–90 µm")), body_style)],
        [Paragraph("Oxygen Barrier (OTR)", body_style), Paragraph(str(tech.get("oxygen_barrier_requirement", "< 100 cc/m²/day")), body_style)],
        [Paragraph("Moisture Barrier (WVTR)", body_style), Paragraph(str(tech.get("moisture_barrier_requirement", "< 5 g/m²/day")), body_style)],
        [Paragraph("Sealability", body_style), Paragraph(str(tech.get("sealability", "Hermetic seal")), body_style)],
        [Paragraph("Mechanical Protection", body_style), Paragraph(str(tech.get("mechanical_protection", "High tensile strength")), body_style)],
        [Paragraph("MAP Suitability", body_style), Paragraph(str(tech.get("map_suitability", "Suitable")), body_style)],
        [Paragraph("Storage Recommendation", body_style), Paragraph(str(tech.get("storage_recommendation", "Cool dry area")), body_style)]
    ]
    t_tech = Table(tech_table_data, colWidths=[200, 310])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (1,0), colors.HexColor('#F8FAFC')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 15))

    # Sustainable Alternative
    story.append(Paragraph("3. Greener / Sustainable Packaging Alternative", heading2_style))
    sust = recommendation_data.get("sustainable_alternative", {})
    story.append(Paragraph(f"<b>Alternative: {sust.get('name', 'Sustainable Option')}</b>", body_style))
    story.append(Paragraph(f"<b>Material:</b> {sust.get('material', '-')}", body_style))
    story.append(Paragraph(f"<b>Sustainability Advantage:</b> {sust.get('sustainability_advantage', '-')}", body_style))
    story.append(Paragraph(f"<b>Performance Trade-off:</b> {sust.get('performance_tradeoff', '-')}", body_style))
    story.append(Paragraph(f"<b>Cost Trade-off:</b> {sust.get('cost_tradeoff', '-')}", body_style))
    story.append(Spacer(1, 15))

    # Disclaimer
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=10))
    story.append(Paragraph(f"<b>Disclaimer:</b> {recommendation_data.get('disclaimer', '')}", disclaimer_style))

    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()


